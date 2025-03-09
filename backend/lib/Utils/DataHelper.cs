using Microsoft.Data.SqlClient;
using System.Data;

namespace back.Utils
{
    public class DataHelper
    {
        private SqlConnection _connection;
        private static DataHelper _instance;
        private DataHelper()
        {
            _connection = new SqlConnection(@"workstation id=bitacora_db.mssql.somee.com;packet size=4096;user id=minimega_SQLLogin_1;pwd=7z6vzucxvx;data source=bitacora_db.mssql.somee.com;persist security info=False;initial catalog=bitacora_db;TrustServerCertificate=True");
        }
        public static DataHelper GetInstance()
        {
            if(_instance == null)
            {
                _instance = new DataHelper();
            }
            return _instance;
        }
        public bool Validate(object obj)
        {
            bool x = false;
            foreach (var prop in obj.GetType().GetProperties())
            {
                if (prop == null)
                {
                    x = false;
                }
                x = true;
            }
            return x;
        }
        public DataTable ExecuteSPQuery(string sp, List<SqlParameter>? parameters)
        {
            DataTable t = new DataTable();

            try
            {
                using (var connection = new SqlConnection(_connection.ConnectionString))
                {
                    connection.Open();
                    using (var cmd = new SqlCommand(sp, connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        if (parameters != null)
                        {
                            foreach (var param in parameters)
                            {
                                cmd.Parameters.AddWithValue(param.ParameterName, param.Value ?? DBNull.Value);
                            }
                        }

                        using (var reader = cmd.ExecuteReader())
                        {
                            t.Load(reader);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Maneja el error según sea necesario
                t = null;
            }

            return t;
        }

        public int ExecuteSPCrudQuery(string sp, List<SqlParameter>? parameters)
        {
            int affectedRows = 0;
            try
            {
                using (var connection = new SqlConnection(_connection.ConnectionString))
                {
                    connection.Open();
                    using (var cmd = new SqlCommand(sp, connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        if (parameters != null)
                        {
                            foreach (var param in parameters)
                            {
                                cmd.Parameters.AddWithValue(param.ParameterName, param.Value ?? DBNull.Value);
                            }
                        }

                        affectedRows = cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                // Maneja el error según sea necesario
                affectedRows = 0;
            }

            return affectedRows;
        }
    }
}
