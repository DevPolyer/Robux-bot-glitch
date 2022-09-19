String.prototype.toDiscordId = function () {
    return this.replace(/[<@#&!>]/g, '');
  }
  
String.prototype.isPositiveInteger = function () {
    if (isNaN(this) || parseInt(this) != this || parseInt(this) <= 0) return false;
    return true;
}
  