using BitacoraAPI.Interfaces;
using BitacoraAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BitacoraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuentaController : ControllerBase
    {
        private readonly ICuenta service;
        public CuentaController(ICuenta _service)
        {
            service = _service;
        }
        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            return Ok(service.GetAll());
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
        public async Task<IActionResult> Save([FromBody] Cuenta cuenta)
        {
            try
            {
                if (await service.Save(cuenta))
                {
                    return Ok("¡Cuenta creada correctamente!");
                } else
                {
                    return BadRequest("No se pudo crear");
                }
            } catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] Cuenta cuenta)
        {
            try
            {
                if (await service.Update(id, cuenta))
                {
                    return Ok("¡Cuenta editada correctamente!");
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
                    return Ok("¡Cuenta eliminada correctamente!");
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
