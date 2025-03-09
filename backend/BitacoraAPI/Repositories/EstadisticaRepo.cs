using BitacoraAPI.Interfaces;
using BitacoraAPI.Models;
using BitacoraAPI.Models.Custom;
using BitacoraAPI.Utils;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;

namespace BitacoraAPI.Repositories
{
    public class EstadisticaRepo : IEstadistica
    {
        private bitacora_dbContext _context;
        private readonly DataHelper helper;
        public EstadisticaRepo(bitacora_dbContext context)
        {
            _context = context;
            helper = DataHelper.GetInstance();
        }

        public dynamic Emocion(int cuenta, int periodo)
        {
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@id", cuenta));
            parameters.Add(new SqlParameter("@period", periodo));
            DataTable t = helper.ExecuteSPQuery("Emocion", parameters);
            DataRow dr = t.Rows[0];
            return new { emotion = dr[0].ToString() };
        }

        public dynamic SaldoInicialActual(int cuenta)
        {
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@id_cuenta", cuenta));
            DataTable t = helper.ExecuteSPQuery("CalcularSaldo", parameters);
            DataRow dr = t.Rows[0];
            return new { saldoInicial = dr[0] == DBNull.Value ? 0 : (decimal)dr[0], saldoActual = dr[1] == DBNull.Value ? 0 : (decimal)dr[1] };
        }

        public dynamic PorcentajeWL(int cuenta, int periodo)
        {
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@id", cuenta));
            parameters.Add(new SqlParameter("@period", periodo));
            DataTable t = helper.ExecuteSPQuery("PorcentajeWL", parameters);
            DataRow dr = t.Rows[0];
            return new { porcentaje = dr[0] == DBNull.Value ? 0 : (decimal)dr[0] };
        }

        public dynamic PromedioPnL(int cuenta)
        {
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@id", cuenta));
            DataTable t = helper.ExecuteSPQuery("PromedioPnl", parameters);
            DataRow dr = t.Rows[0];
            return new { pnlAvg = dr[0] == DBNull.Value ? 0 : (decimal)dr[0] };
        }

        public List<dynamic> PnLWeeklyMonthlyYearly(int cuenta, int periodo)
        {

            List<dynamic> lst = new List<dynamic>();
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@id", cuenta));
            parameters.Add(new SqlParameter("@period", periodo));
            DataTable t = helper.ExecuteSPQuery("PnLWeeklyMonthlyYearly", parameters);
            foreach(DataRow dr in t.Rows)
            {
                lst.Add(new { pnl = (decimal)dr[0], fecha = (DateTime)dr[1] });
            }
            return lst;
        }
    }
}
