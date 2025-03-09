using BitacoraAPI.Interfaces;
using BitacoraAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BitacoraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadisticaController : ControllerBase
    {
        private readonly IEstadistica service;
        public EstadisticaController(IEstadistica _service)
        {
            service = _service;
        }
        [HttpGet("porcentaje/{cuenta}-{period}")]
        [Authorize]
        public IActionResult GetPercentage(int cuenta, int period)
        {
            return Ok(service.PorcentajeWL(cuenta, period));
        }
        [HttpGet("promedio/{cuenta}")]
        [Authorize]
        public IActionResult GetAverage(int cuenta)
        {
            return Ok(service.PromedioPnL(cuenta));
        }
        [HttpGet("saldo/{cuenta}")]
        [Authorize]
        public IActionResult GetAccountSize(int cuenta)
        {
            return Ok(service.SaldoInicialActual(cuenta));
        }
        [HttpGet("pnlPeriod/{cuenta}-{period}")]
        [Authorize]
        public IActionResult GetPnlPeriod(int cuenta, int period)
        {
            return Ok(service.PnLWeeklyMonthlyYearly(cuenta, period));
        }
        [HttpGet("emotion/{cuenta}-{period}")]
        [Authorize]
        public IActionResult GetEmotion(int cuenta, int period)
        {
            return Ok(service.Emocion(cuenta, period));
        }
    }
}
