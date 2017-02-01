const apiUrl = 'https://fbytmcmwt1.execute-api.ap-northeast-1.amazonaws.com/dev/teacher';

function formatBirthdate(BirthDate) {
  if (!BirthDate) {
    return '';
  }

  const birthdate = new Date(BirthDate);
  const birthdateStart = new Date(birthdate.setHours(0,0,0,0)).toISOString();
  const birthdateEnd = new Date(birthdate.setHours(23,59,59,999)).toISOString();

  return `BirthDate:[${birthdateStart} TO ${birthdateEnd}]`;
}

function prepareQuery(Firstname, Lastname, BirthDate) {
  const query = [
    'index=customer&q=kind:Inquiry',
    `FirstnameKanji:${Firstname}`,
    `LastnameKanji:${Lastname}`,
    `${formatBirthdate(BirthDate)}`
  ];

  return query.join(' AND ');
}

export default (FirstnameKanji, LastnameKanji, BirthDate) => `${apiUrl}/search?${prepareQuery(FirstnameKanji, LastnameKanji, BirthDate)}`;
