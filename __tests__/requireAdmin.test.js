const requireAdmin = require('../middlewares/requireAdmin'); 

describe('requireAdmin middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      session: {
        user: {}, 
      },
    };
    res = {
      redirect: jest.fn(),
    };
    next = jest.fn();
  });

  it('deve chamar em seguida se o usuário for um administrador', () => {
    req.session.user.isAdmin = true; 
    requireAdmin(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.redirect).not.toHaveBeenCalled();
  });

  it('deve redirecionar para "/" se o usuário não for um administrador', () => {
    req.session.user.isAdmin = false; 
    requireAdmin(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/');
    expect(next).not.toHaveBeenCalled();
  });

  it('deve redirecionar para "/" se o objeto do usuário não tiver a propriedade isAdmin', () => {
    requireAdmin(req, res, next); 
    expect(res.redirect).toHaveBeenCalledWith('/');
    expect(next).not.toHaveBeenCalled();
  });
});