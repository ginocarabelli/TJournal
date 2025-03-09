using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using BitacoraAPI.Models;
using BitacoraAPI.Interfaces;
using BitacoraAPI.Models.Custom;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

namespace BitacoraAPI.Repositories.Repo
{
    public class AutorizacionService : IAutorizacionService
    {
        private readonly bitacora_dbContext _context;
        private readonly IConfiguration _configuration;
        public AutorizacionService(bitacora_dbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        private string GenerarToken(string idUsuario)
        {
            Usuario user = _context.Usuarios.Find(Convert.ToInt32(idUsuario));

            var key = _configuration.GetValue<string>("Jwt:Key");
            var keyBytes = Encoding.ASCII.GetBytes(key);

            var claims = new ClaimsIdentity();
            if(user != null)
            {
                claims.AddClaim(new Claim(ClaimTypes.Name, idUsuario));
                claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Usuario1));
                claims.AddClaim(new Claim(ClaimTypes.Email, user.Email));
            }

            var credencialesToken = new SigningCredentials(
                new SymmetricSecurityKey(keyBytes),
                SecurityAlgorithms.HmacSha256Signature
            );

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = credencialesToken
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);

            string createdToken = tokenHandler.WriteToken(tokenConfig);

            return createdToken;
        }
        public async Task<AutorizacionResponse> DevolverToken(AutorizacionRequest autorizacion)
        {
            var foundUser = _context.Usuarios.FirstOrDefault(
            u => u.Usuario1 == autorizacion.Username 
            && u.Contrasena == autorizacion.Password
            );

            if(foundUser == null)
            {
                return await Task.FromResult<AutorizacionResponse>(null);
            }

            string tokenCreado = GenerarToken(foundUser.IdUsuario.ToString());

            return new AutorizacionResponse { Token = tokenCreado, User = foundUser };
        }
    }
}
