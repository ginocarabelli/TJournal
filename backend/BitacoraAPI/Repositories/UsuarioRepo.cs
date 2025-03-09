using BitacoraAPI.Models;
using BitacoraAPI.Utils;
using BitacoraAPI.Interfaces;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BitacoraAPI.Models.Custom;

namespace BitacoraAPI.Repositories
{
    public class UsuarioRepo : IUsuario
    {
        private bitacora_dbContext _context;
        private DataHelper helper;
        public UsuarioRepo(bitacora_dbContext context)
        {
            _context = context;
            helper = DataHelper.GetInstance();
        }

        public List<Usuario> GetAll()
        {
            List<Usuario> lst = new List<Usuario>();
            DataTable table = helper.ExecuteSPQuery("TraerUsuariosAll", null);
            foreach (DataRow dr in table.Rows)
            {
                Usuario c = new Usuario();
                c.IdUsuario = (int)dr[0];
                c.Nombre = dr[1].ToString();
                c.Apellido = dr[2].ToString();
                c.Email = dr[3].ToString();
                c.Usuario1 = dr[4].ToString();
                c.Contrasena = dr[4].ToString();
                lst.Add(c);
            }
            return lst;
        }

        public Usuario GetByCuenta(int id)
        {
            Usuario c = new Usuario();
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@id_cuenta", id));
            DataTable table = helper.ExecuteSPQuery("TraerUsuariosCuenta", parameters);
            DataRow dr = table.Rows[0];
            c.IdUsuario = (int)dr[0];
            c.Nombre = dr[1].ToString();
            c.Apellido = dr[2].ToString();
            c.Email = dr[3].ToString();
            c.Usuario1 = dr[4].ToString();
            c.Contrasena = dr[4].ToString();
            return c;
        }
        public Usuario GetById(int id)
        {
            return _context.Usuarios.Find(id);
        }

        public Usuario GetByUserAndPass(string user, string password)
        {
            Usuario c = new Usuario();
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@usuario", user));
            parameters.Add(new SqlParameter("@contrasena", password));
            DataTable table = helper.ExecuteSPQuery("TraerUsuariosUP", parameters);
            DataRow dr = table.Rows[0];
            c.IdUsuario = (int)dr[0];
            c.Nombre = dr[1].ToString();
            c.Apellido = dr[2].ToString();
            c.Email = dr[3].ToString();
            c.Usuario1 = dr[4].ToString();
            c.Contrasena = dr[4].ToString();
            return c;
        }

        public Usuario GetByEmail(string email)
        {
            Usuario c = new Usuario();
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@email", email));
            DataTable table = helper.ExecuteSPQuery("TraerUsuariosEmail", parameters);
            DataRow dr = table.Rows[0];
            c.IdUsuario = (int)dr[0];
            c.Nombre = dr[1].ToString();
            c.Apellido = dr[2].ToString();
            c.Email = dr[3].ToString();
            c.Usuario1 = dr[4].ToString();
            c.Contrasena = dr[4].ToString();
            return c;
        }
        private dynamic ValidateUser(Usuario usuario)
        {
            if (_context.Usuarios.FirstOrDefault(x => x.Email == usuario.Email) != null)
            {
                return new { Result = false, Message = "Este email ya está en uso"};
            } 
            else if (_context.Usuarios.FirstOrDefault(x => x.Usuario1 == usuario.Usuario1) != null)
            {
                return new { Result = false, Message = "Este nombre de usuario ya está en uso" };
            }
            else if (usuario.Contrasena.Length > 16 || usuario.Contrasena.Length < 8) 
            {
                return new { Result = false, Message = "La contraseña debe ser mayor a 8 caracteres y menor a 16" };
            }
            return new { Result = true, Message = "verified" };
        }

        private dynamic ValidateUpdateUser(int id, Usuario usuario)
        {
            Usuario prev = _context.Usuarios.Find(id);
            if (prev.Email != usuario.Email && _context.Usuarios.FirstOrDefault(x => x.Email == usuario.Email) != null)
            {
                return new { Result = false, Message = "Este email ya está en uso" };
            }
            else if (prev.Usuario1 != usuario.Usuario1 && _context.Usuarios.FirstOrDefault(x => x.Usuario1 == usuario.Usuario1) != null)
            {
                return new { Result = false, Message = "Este nombre de usuario ya está en uso" };
            }
            else if (prev.Contrasena != usuario.Contrasena && usuario.Contrasena.Length > 16 || usuario.Contrasena.Length < 8)
            {
                return new { Result = false, Message = "La contraseña debe ser mayor a 8 caracteres y menor a 16" };
            }
            return new { Result = true, Message = "verified" };
        }

        public async Task<dynamic> Save(Usuario usuario)
        {
            try
            {
                dynamic validateResult = ValidateUser(usuario);
                if (validateResult.Result)
                {
                    List<SqlParameter> parameters = new List<SqlParameter>();
                    // Se agregan los parámetros al procedimiento almacenado
                    parameters.Add(new SqlParameter("@nombre", usuario.Nombre));
                    parameters.Add(new SqlParameter("@apellido", usuario.Apellido));
                    parameters.Add(new SqlParameter("@email", usuario.Email));
                    parameters.Add(new SqlParameter("@usuario", usuario.Usuario1));
                    parameters.Add(new SqlParameter("@contrasena", usuario.Contrasena));

                    // Llamada al procedimiento almacenado y obtención de las filas afectadas
                    int affectedRows = helper.ExecuteSPCrudQuery("CrearUsuario", parameters);
                    if(affectedRows > 0)
                    {
                        return new { Resultado = true, Mensaje = "¡Usuario creado correctamente!" };
                    } else
                    {
                        return new { Resultado = false, Mensaje = "No se ha podido crear el usuario" };
                    }
                } else
                {
                    return new { Resultado = validateResult.Result, Mensaje = validateResult.Message };
                }
            }
            catch (Exception ex)
            {
                // Si ocurre una excepción, se captura y se retorna false
                return new { Resultado = false, Mensaje = "Internal server Error" }; ;
            }
        }

        public async Task<dynamic> Update(int id, Usuario usuario)
        {
            try
            {
                dynamic validate = ValidateUpdateUser(id, usuario);
                if (validate.Result)
                {
                    List<SqlParameter> parameters = new List<SqlParameter>();

                    // Se agregan los parámetros al procedimiento almacenado
                    parameters.Add(new SqlParameter("@id_usuario", id));
                    parameters.Add(new SqlParameter("@nombre", usuario.Nombre ?? (object)DBNull.Value));
                    parameters.Add(new SqlParameter("@apellido", usuario.Apellido ?? (object)DBNull.Value));
                    parameters.Add(new SqlParameter("@email", usuario.Email ?? (object)DBNull.Value));
                    parameters.Add(new SqlParameter("@usuario", usuario.Usuario1 ?? (object)DBNull.Value));
                    parameters.Add(new SqlParameter("@contrasena", usuario.Contrasena ?? (object)DBNull.Value));

                    // Llamada al procedimiento almacenado y obtención de las filas afectadas
                    int affectedRows = helper.ExecuteSPCrudQuery("EditarUsuario", parameters);

                    if (affectedRows > 0)
                    {
                        return new { Resultado = true, Mensaje = "¡Usuario editado correctamente!" };
                    }
                    else
                    {
                        return new { Resultado = false, Mensaje = "No se ha podido editar el usuario" };
                    }
                } else
                {
                    return new { Resultado = validate.Result, Mensaje = validate.Message };
                }
            }
            catch (Exception ex)
            {
                // Si ocurre una excepción, se captura y se retorna false
                return new { Resultado = false, Mensaje = "Internal server Error" }; ;
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("@id_user", id));

                int affectedRows = helper.ExecuteSPCrudQuery("EliminarUsuario", parameters);
                return affectedRows > 0;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
