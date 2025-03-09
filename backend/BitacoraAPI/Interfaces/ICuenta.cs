using BitacoraAPI.Models;
using BitacoraAPI.Models.Custom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BitacoraAPI.Interfaces
{
    public interface ICuenta
    {
        public List<Cuenta> GetAll();
        public List<Cuenta> GetById(int id);
        public List<Cuenta> GetByUser(int id);
        public Task<bool> Save(Cuenta cuenta);
        public Task<bool> Update(int id, Cuenta cuenta);
        public Task<bool> Delete(int id);
    }
}
