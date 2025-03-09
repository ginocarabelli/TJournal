using BitacoraAPI.Interfaces;
using BitacoraAPI.Models;
using BitacoraAPI.Utils;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BitacoraAPI.Repositories
{
    public class TipoTradeRepo : ITipoTrade
    {
        private bitacora_dbContext _context;
        private DataHelper helper;
        public TipoTradeRepo(bitacora_dbContext context)
        {
            _context = context;
            helper = DataHelper.GetInstance();
        }

        public List<TiposTrade> GetAll()
        {
            List<TiposTrade> lst = new List<TiposTrade>();
            DataTable table = helper.ExecuteSPQuery("TraerTiposTrades", null);
            foreach(DataRow dr in table.Rows)
            {
                TiposTrade t = new TiposTrade();
                t.IdTipoTrade = (int)dr[0];
                t.TipoTrade = dr[1].ToString();
                lst.Add(t);
            }
            return lst;
        }
    }
}
