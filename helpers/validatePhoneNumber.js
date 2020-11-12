export default function (phone_number) {
  if (!/^\d+$/.test(phone_number) || phone_number.length !== 11) {
    return false;
  }

  return true;
}
