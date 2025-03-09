using BitacoraAPI.Models;
using BitacoraAPI.Models.Custom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BitacoraAPI.Interfaces
{
    public interface IUsuario
    {
        public List<Usuario> GetAll();
        public Usuario GetByUserAndPass(string user, string password);
        public Usuario GetByCuenta(int id);
        public Usuario GetById(int id);
        public Usuario GetByEmail(string email);
        public Task<dynamic> Save(Usuario usuario);
        public Task<dynamic> Update(int id, Usuario usuario);
        public Task<bool> Delete(int id);
    }
}
