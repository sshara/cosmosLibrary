package com.zanahoria.firstProject.service;

import com.zanahoria.firstProject.data.entity.User;
import com.zanahoria.firstProject.data.repository.UserRepo;
import com.zanahoria.firstProject.service.mapper.UserMapper;
import com.zanahoria.firstProject.web.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {


    private final UserRepo userRepo;
    @Autowired
    private final UserMapper userMapper;

    public List<UserDTO> getUsers(){
        Iterable<User> userIterator = userRepo.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();

        for (User user : userIterator) {
            UserDTO userDTO = userMapper.fromUser(user);
            userDTOList.add(userDTO);
        }
        
        return userDTOList;
    }

    @Transactional
    public void insertUserNative(){

    }
/*
    public UsuarioDTO getUsuario(String id) throws Exception {
        Optional<Usuario> usuario = usuarioRepository.findById(Long.valueOf(id));
        if(!usuario.isPresent()){
            throw new Exception("Usuario no encontrado en el sistema.");
        }
        else{
            UsuarioDTO resp = usuarioMapper.fromUsuario(usuario.get());
            RolDTO rolRelated = rolMapper.fromRol(usuario.get().getRol());
            resp.setRol(rolRelated);
            return resp;

 */
}
