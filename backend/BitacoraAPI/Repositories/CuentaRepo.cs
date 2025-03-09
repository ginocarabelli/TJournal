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

namespace BitacoraAPI.Repositories
{
    public class CuentaRepo : ICuenta
    {
        private bitacora_dbContext _context;
        private DataHelper helper;
        public CuentaRepo(bitacora_dbContext context)
        {
            _context = context;
            helper = DataHelper.GetInstance();
        }

        public List<Cuenta> GetAll()
        {
            List<Cuenta> lst = new List<Cuenta>();
            DataTable table = helper.ExecuteSPQuery("TraerCuentasAll", null);
            foreach (DataRow dr in table.Rows)
            {
                Cuenta c = new Cuenta();
                c.IdCuenta = (int)dr[0];
                c.IdUsuario = (int)dr[1];
                c.Tamanio = (decimal)dr[2];
                c.Empresa = dr[3] == DBNull.Value ? "Sin Empresa" : dr[3].ToString();
                c.FechaCreacion = dr[4] == DBNull.Value ? null : DateOnly.FromDateTime((DateTime)dr[4]);
                lst.Add(c);
            }
            return lst;
        }

        public List<Cuenta> GetById(int id)
        {
            List<Cuenta> lst = new List<Cuenta>();
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@id", id));
            DataTable table = helper.ExecuteSPQuery("TraerCuentasId", parameters);
            foreach (DataRow dr in table.Rows)
            {
                Cuenta c = new Cuenta();
                c.IdCuenta = (int)dr[0];
                c.IdUsuario = (int)dr[1];
                c.Tamanio = (decimal)dr[2];
                c.Empresa = dr[3] == DBNull.Value ? "Sin Empresa" : dr[3].ToString();
                c.FechaCreacion = dr[4] == DBNull.Value ? null : DateOnly.FromDateTime((DateTime)dr[4]);
                lst.Add(c);
            }
            return lst;
        }

        public List<Cuenta> GetByUser(int id)
        {
            List<Cuenta> lst = new List<Cuenta>();
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@id_user", id));
            DataTable table = helper.ExecuteSPQuery("TraerCuentasUser", parameters);
            foreach (DataRow dr in table.Rows)
            {
                Cuenta c = new Cuenta();
                c.IdCuenta = (int)dr[0];
                c.IdUsuario = (int)dr[1];
                c.Tamanio = (decimal)dr[2];
                c.Empresa = dr[3] == DBNull.Value ? "Sin Empresa" : dr[3].ToString();
                c.FechaCreacion = dr[4] == DBNull.Value ? null : DateOnly.FromDateTime((DateTime)dr[4]);
                lst.Add(c);
            }
            return lst;
        }

        public async Task<bool> Save(Cuenta cuenta)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("@id_usuario", cuenta.IdUsuario));
                parameters.Add(new SqlParameter("@tamano", cuenta.Tamanio));
                parameters.Add(new SqlParameter("@empresa", cuenta.Empresa));

                int affectedRows = helper.ExecuteSPCrudQuery("CrearCuenta", parameters);
                return affectedRows > 0;

            } catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<bool> Update(int id, Cuenta cuenta)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("@id_cuenta", id));
                parameters.Add(new SqlParameter("@id_usuario", cuenta.IdUsuario));
                parameters.Add(new SqlParameter("@tamano", cuenta.Tamanio));
                parameters.Add(new SqlParameter("@empresa", cuenta.Empresa));

                int affectedRows = helper.ExecuteSPCrudQuery("EditarCuenta", parameters);
                return affectedRows > 0;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<bool> Delete(int id)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("@id_cuenta", id));

                int affectedRows = helper.ExecuteSPCrudQuery("EliminarCuenta", parameters);
                return affectedRows > 0;

            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}
