using BitacoraAPI.Interfaces;
using BitacoraAPI.Models;
using BitacoraAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BitacoraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuario service;
        public UsuarioController(IUsuario _service)
        {
            service = _service;
        }
        [HttpGet("id/{id}")]
        [Authorize]
        public IActionResult GetById(int id)
        {
            return Ok(service.GetById(id));
        }
        [HttpGet("cuenta/{id}")]
        [Authorize]
        public IActionResult GetByCuenta(int id)
        {
            return Ok(service.GetByCuenta(id));
        }
        [HttpGet("email/{email}")]
        [Authorize]
        public IActionResult GetByUser(string email)
        {
            return Ok(service.GetByEmail(email));
        }
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] Usuario user)
        {
            try
            {
                dynamic postResult = await service.Update(id, user);
                if (postResult.Resultado)
                {
                    return Ok("¡Usuario editado correctamente!");
                }
                else
                {
                    return BadRequest(postResult.Mensaje);
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
                    return Ok("¡user eliminada correctamente!");
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
