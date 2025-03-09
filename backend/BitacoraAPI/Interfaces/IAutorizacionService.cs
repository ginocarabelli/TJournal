using BitacoraAPI.Models;
using BitacoraAPI.Models.Custom;

namespace BitacoraAPI.Interfaces
{
    public interface IAutorizacionService
    {
        Task<AutorizacionResponse> DevolverToken(AutorizacionRequest autorizacion);
    }
}
