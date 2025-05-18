const requireLogin = require('../middlewares/requireLogin'); 

describe('requireLogin middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
 
    req = {
      session: {},
    };
    res = {
      redirect: jest.fn(),
    };
    next = jest.fn();
  });

  it('deve chamar em seguida se o usuário estiver logado', () => {
    req.session.user = {}; 
    requireLogin(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.redirect).not.toHaveBeenCalled();
  });

  it('deve redirecionar para "/" se o usuário não estiver logado', () => {
    requireLogin(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/');
    expect(next).not.toHaveBeenCalled();
  });
});