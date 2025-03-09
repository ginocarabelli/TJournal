using BitacoraAPI.Interfaces;
using BitacoraAPI.Models;
using BitacoraAPI.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BitacoraAPI.Repositories
{
    public class TradeRepo : ITrade
    {
        private bitacora_dbContext _context;
        private DataHelper helper;
        public TradeRepo(bitacora_dbContext context)
        {
            _context = context;
            helper = DataHelper.GetInstance();
        }

        public List<Trade> GetByCuenta(int id)
        {
            List<Trade> lst = new List<Trade>();
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@id_cuenta", id));
            DataTable table = helper.ExecuteSPQuery("TraerTradesCuenta", parameters);
            foreach (DataRow dr in table.Rows)
            {
                Trade c = new Trade();
                c.IdTrade = (int)dr[0];
                c.IdCuenta = (int)dr[1];
                c.IdTipoTrade = (int)dr[2];
                c.FechaEntrada = (DateTime)dr[3];
                c.FechaSalida = dr[4] == DBNull.Value ? null : (DateTime)dr[4];
                c.Divisa = dr[5].ToString();
                c.Riesgo = (decimal)dr[6];
                c.Margin = (decimal)dr[7];
                c.PrecioEntrada = (decimal)dr[8];
                c.PrecioSalida = (decimal)dr[9];
                c.TakeProfit = dr[10] == DBNull.Value ? null : (decimal)dr[10];
                c.StopLoss = dr[11] == DBNull.Value ? null : (decimal)dr[11];
                c.TradePips = dr[12] == DBNull.Value ? null : (int)dr[12];
                c.PorcentajePnl = (decimal)dr[13];
                c.DineroPnl = (decimal)dr[14];
                c.Nota = dr[15] == DBNull.Value ? null : dr[15].ToString();
                lst.Add(c);
            }
            return lst;
        }

        public Trade GetById(int id)
        {
            List<SqlParameter> parameters = new List<SqlParameter>();
            Trade t = _context.Trades.Find(id);
            return t;
        }

        public List<Trade> GetByUser(int id)
        {
            List<Trade> lst = new List<Trade>();
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@id_user", id));
            DataTable table = helper.ExecuteSPQuery("TraerTradesUser", parameters);
            foreach (DataRow dr in table.Rows)
            {
                Trade c = new Trade();
                c.IdTrade = (int)dr[0];
                c.IdCuenta = (int)dr[1];
                c.IdTipoTrade = (int)dr[2];
                c.FechaEntrada = (DateTime)dr[3];
                c.FechaSalida = dr[4] == DBNull.Value ? null : (DateTime)dr[4];
                c.Divisa = dr[5].ToString();
                c.Riesgo = (decimal)dr[6];
                c.Margin = (decimal)dr[7];
                c.PrecioEntrada = (decimal)dr[8];
                c.PrecioSalida = (decimal)dr[9];
                c.TakeProfit = dr[10] == DBNull.Value ? null : (decimal)dr[10];
                c.StopLoss = dr[11] == DBNull.Value ? null : (decimal)dr[11];
                c.TradePips = dr[12] == DBNull.Value ? null : (int)dr[12];
                c.PorcentajePnl = (decimal)dr[13];
                c.DineroPnl = (decimal)dr[14];
                c.Nota = dr[15] == DBNull.Value ? null : dr[15].ToString();
                lst.Add(c);
            }
            return lst;
        }

        public async Task<bool> Save(Trade trade)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();

                // Se agregan los parámetros al procedimiento almacenado
                parameters.Add(new SqlParameter("@divisa", trade.Divisa));
                parameters.Add(new SqlParameter("@id_cuenta", trade.IdCuenta));
                parameters.Add(new SqlParameter("@id_tipo_trade", trade.IdTipoTrade));
                parameters.Add(new SqlParameter("@fecha_entrada", trade.FechaEntrada));
                parameters.Add(new SqlParameter("@fecha_salida", trade.FechaSalida));
                parameters.Add(new SqlParameter("@riesgo", trade.Riesgo));
                parameters.Add(new SqlParameter("@margin", trade.Margin));
                parameters.Add(new SqlParameter("@precio_entrada", trade.PrecioEntrada));
                parameters.Add(new SqlParameter("@precio_salida", trade.PrecioSalida ?? (object)DBNull.Value));
                parameters.Add(new SqlParameter("@take_profit", trade.TakeProfit ?? (object)DBNull.Value));
                parameters.Add(new SqlParameter("@stop_loss", trade.StopLoss ?? (object)DBNull.Value));
                parameters.Add(new SqlParameter("@trade_pips", trade.TradePips ?? (object)DBNull.Value));
                parameters.Add(new SqlParameter("@porcentaje_pnl", trade.PorcentajePnl));
                parameters.Add(new SqlParameter("@dinero_pnl", trade.DineroPnl));
                parameters.Add(new SqlParameter("@nota", trade.Nota ?? (object)DBNull.Value));
                // Llamada al procedimiento almacenado y obtención de las filas afectadas
                int affectedRows = helper.ExecuteSPCrudQuery("CrearTrade", parameters);

                return affectedRows > 0;
            }
            catch (Exception ex)
            {
                // Si ocurre una excepción, se captura y se retorna false
                return false;
            }
        }

        public async Task<bool> Update(int id, Trade trade)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();

                // Se agregan los parámetros al procedimiento almacenado
                parameters.Add(new SqlParameter("@id_trade", id));
                parameters.Add(new SqlParameter("@divisa", trade.Divisa ?? (object)DBNull.Value));
                parameters.Add(new SqlParameter("@id_cuenta", trade.IdCuenta));
                parameters.Add(new SqlParameter("@id_tipo_trade", trade.IdTipoTrade));
                parameters.Add(new SqlParameter("@fecha_entrada", trade.FechaEntrada ));
                parameters.Add(new SqlParameter("@fecha_salida", trade.FechaSalida));
                parameters.Add(new SqlParameter("@riesgo", trade.Riesgo));
                parameters.Add(new SqlParameter("@margin", trade.Margin));
                parameters.Add(new SqlParameter("@precio_entrada", trade.PrecioEntrada));
                parameters.Add(new SqlParameter("@precio_salida", trade.PrecioSalida));
                parameters.Add(new SqlParameter("@take_profit", trade.TakeProfit ?? (object)DBNull.Value));
                parameters.Add(new SqlParameter("@stop_loss", trade.StopLoss ?? (object)DBNull.Value));
                parameters.Add(new SqlParameter("@trade_pips", trade.TradePips ?? (object)DBNull.Value));
                parameters.Add(new SqlParameter("@porcentaje_pnl", trade.PorcentajePnl));
                parameters.Add(new SqlParameter("@dinero_pnl", trade.DineroPnl));
                parameters.Add(new SqlParameter("@nota", trade.Nota ?? (object)DBNull.Value));
                // Llamada al procedimiento almacenado y obtención de las filas afectadas
                int affectedRows = helper.ExecuteSPCrudQuery("EditarTrade", parameters);

                return affectedRows > 0;
            }
            catch (Exception ex)
            {
                // Si ocurre una excepción, se captura y se retorna false
                return false;
            }
        }
        public async Task<bool> Delete(int id)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("@id_trade", id));

                int affectedRows = helper.ExecuteSPCrudQuery("EliminarTrade", parameters);
                return affectedRows > 0;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
