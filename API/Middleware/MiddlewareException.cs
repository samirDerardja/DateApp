using System;
using System.Net;
using System.Text.Json;
using API.Errors;
using Microsoft.AspNetCore.Diagnostics;

namespace API.Middleware;

public class MiddlewareException(RequestDelegate next, ILogger<MiddlewareException> logger, IHostEnvironment env)
{
       public async Task InvokeAsync(HttpContext context)
       {
                 try {
                    await next(context);
                 }
                 catch(Exception ex)
                 {
                    logger.LogError(ex.Message);
                    context.Response.ContentType = "application/json";
                     context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                     var response = env.IsDevelopment()
                     ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace )
                     :  new ApiException(context.Response.StatusCode, ex.Message, "erreur interne du serveur" );

                     var options = new JsonSerializerOptions
                     {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase

                     };

                     var json = JsonSerializer.Serialize(response, options);
                     await context.Response.WriteAsJsonAsync(json);
                 }
                 
       }
}
