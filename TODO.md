# Back-end

- [ ] Retornar somente enquetes ativas
- [ ] Ordenar pelas enquetes que terminarão primeiro
- [ ] Adicionar filtros ao endpoint de surveys (filtro status, filtro data)
- [ ] Criar mecanismo de refresh token
- [x] Adicionar validação de data inicial deve ser sempre menor que a data final
- [x] Adicionar validação de data iniciar deve ser maior ou igual que o momento atual
- [ ] Implementar logout
- [ ] Implementar uplaod de foto do usuário
- [x] Implementar verificação de token

# Front-end

- [x] Corrigir bug de dupla instância do componente (ocasionado pelo layouts)
- [x] Adicionar lib de gereciamento de estado (avaliar entre vuex ou pinia)
- [ ] Implementar mecanismo de refresh token
- [x] Salvar dados do usuário após o login no state
- [ ] Criar página inicial com listagem de enquetes
- [ ] Adicionar lib de icones
- [x] Criar middlewares de autenticação (usuário logado para paginas internas e usuário deslogado para login)
- [ ] Implementar logout
- [ ] Verificar se o token não foi expirado
