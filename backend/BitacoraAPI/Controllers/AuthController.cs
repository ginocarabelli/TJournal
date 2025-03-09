using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using BitacoraAPI.Models.Custom;
using BitacoraAPI.Repositories.Repo;
using BitacoraAPI.Interfaces;
using BitacoraAPI.Models;
using BitacoraAPI.Repositories;

namespace BitacoraAPI.Controllers
{
    [ApiController]
    [Route("user")]
    public class AuthController : ControllerBase
    {
        public IConfiguration _configuration;
        public IUsuario _usuarioRepo;
        public IAutorizacionService _autorizacionService;
        public AuthController(IConfiguration configuration, IAutorizacionService service, IUsuario usuarioRepo)
        {
            _configuration = configuration;
            _autorizacionService = service;
            _usuarioRepo = usuarioRepo;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Autenticar([FromBody] AutorizacionRequest autorizacion)
        {
            var resultado = await _autorizacionService.DevolverToken(autorizacion);

            if(resultado == null)
            {
                return Unauthorized();
            }

            return Ok(resultado);
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] Usuario user)
        {
            try
            {
                dynamic postResult = await _usuarioRepo.Save(user);
                if (postResult.Resultado)
                {
                    AutorizacionRequest auth = new AutorizacionRequest()
                    {
                        Username = user.Usuario1,
                        Password = user.Contrasena
                    };
                    var generateToken = await _autorizacionService.DevolverToken(auth);

                    return Ok(generateToken);
                }
                return BadRequest(new { error = postResult.Mensaje });
            } catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }
    }

}
