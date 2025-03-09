using BitacoraAPI.Models;

namespace BitacoraAPI.Interfaces
{
    public interface IEstadistica
    {
        public dynamic Emocion(int cuenta, int periodo);
        public dynamic SaldoInicialActual(int cuenta);
        public dynamic PorcentajeWL(int cuenta, int periodo);
        public dynamic PromedioPnL(int cuenta);
        public List<dynamic> PnLWeeklyMonthlyYearly(int cuenta, int periodo);
    }
}
