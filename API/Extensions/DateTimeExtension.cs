using System;

namespace API.Extensions;

public static class DateTimeExtension
{


    public static int CalculOfAge(this DateOnly dob) {

       var today = DateOnly.FromDateTime(DateTime.Now);
       var age = today.Year - dob.Year;
       if( dob > today.AddDays(-age)) age--;

       return age;

    }
}
