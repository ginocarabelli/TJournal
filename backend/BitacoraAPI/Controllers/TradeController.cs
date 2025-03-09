using BitacoraAPI.Interfaces;
using BitacoraAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BitacoraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TradeController : ControllerBase
    {
        private readonly ITrade service;
        public TradeController(ITrade _service)
        {
            service = _service;
        }
        [HttpGet("cuenta/{id}")]
        [Authorize]
        public IActionResult GetByCuenta(int id)
        {
            return Ok(service.GetByCuenta(id));
        }
        [HttpGet("id/{id}")]
        [Authorize]
        public IActionResult GetById(int id)
        {
            return Ok(service.GetById(id));
        }
        [HttpGet("user/{user_id}")]
        [Authorize]
        public IActionResult GetByUser(int user_id)
        {
            return Ok(service.GetByUser(user_id));
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Save([FromBody] Trade trade)
        {
            try
            {
                if (await service.Save(trade))
                {
                    return Ok("¡Trade creado correctamente!");
                }
                else
                {
                    return BadRequest("No se pudo crear");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] Trade trade)
        {
            try
            {
                if (await service.Update(id, trade))
                {
                    return Ok("¡Trade editada correctamente!");
                }
                else
                {
                    return BadRequest("No se pudo editar");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                if (await service.Delete(id))
                {
                    return Ok("¡Trade eliminada correctamente!");
                }
                else
                {
                    return BadRequest("No se pudo eliminar");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
