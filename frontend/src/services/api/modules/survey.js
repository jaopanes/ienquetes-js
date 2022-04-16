export default axios => ({
  listAll() {
    return axios.get('/survey', {
      headers: {
        Authorization: `Bearer eyaJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm_Do28gQmlyZWxvIE5ldG8iLCJuaWNrbmFtZSI6Imphb3BhbmVzIiwiZW1haWwiOiJuam9hbzYwMTZAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMi0wNC0wMyAxODoxMTo0OSIsInVwZGF0ZWRBdCI6IjIwMjItMDQtMDMgMTg6MTE6NDkiLCJpZCI6IjQyNTkyOTNmLWU0OTEtNGMxMi05ZmU2LTEyMjIwZmQ5Yjg1MSIsImlhdCI6MTY1MDExOTgwNywiZXhwIjoxNjUwMjY5ODA3fQ.58x-7Q2kRTPcewXPCq46sqyBZl_vApEGOcbggzYMyVk`
      }
    })
  },
});