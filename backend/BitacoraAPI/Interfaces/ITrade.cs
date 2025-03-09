using BitacoraAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BitacoraAPI.Interfaces
{
    public interface ITrade
    {
        public List<Trade> GetByCuenta(int cuenta);
        public Trade GetById(int id);
        public List<Trade> GetByUser(int id);
        public Task<bool> Save(Trade trade);
        public Task<bool> Update(int id, Trade trade);
        public Task<bool> Delete(int id);

    }
}
