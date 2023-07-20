using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DataAccess.Configurations
{
class DateTimeOffsetUtcConverter : ValueConverter<DateTimeOffset, string>
  {
    public DateTimeOffsetUtcConverter() : base(
      dateTimeOffset => dateTimeOffset.UtcDateTime.ToString("dd-MM-yyyy HH:mm:ssZ"),
      dateTime => DateTimeOffset.ParseExact(dateTime, "dd-MM-yyyy HH:mm:ssZ", CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal))
    {
    }
  }
}
