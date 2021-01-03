package com.zanahoria.firstProject.service;

import com.zanahoria.firstProject.data.entity.Role;
import com.zanahoria.firstProject.data.entity.User;
import com.zanahoria.firstProject.data.entity.UserStatus;
import com.zanahoria.firstProject.data.repository.RoleRepo;
import com.zanahoria.firstProject.data.repository.UserRepo;
import com.zanahoria.firstProject.data.repository.UserStatusRepo;
import com.zanahoria.firstProject.service.mapper.RoleMapper;
import com.zanahoria.firstProject.service.mapper.UserMapper;
import com.zanahoria.firstProject.service.mapper.UserStatusMapper;
import com.zanahoria.firstProject.web.dto.ResponseDTO;
import com.zanahoria.firstProject.web.dto.RoleDTO;
import com.zanahoria.firstProject.web.dto.UserDTO;
import com.zanahoria.firstProject.web.dto.UserStatusDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final UserStatusRepo userStatusRepo;

    @Autowired
    private final UserMapper userMapper;
    @Autowired
    private final RoleMapper roleMapper;
    @Autowired
    private final UserStatusMapper userStatusMapper;

    public ResponseDTO getUsers(){
        ResponseDTO res = new ResponseDTO();
        Iterable<User> userIterator = userRepo.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();
        for (User user : userIterator) {
            UserDTO userDTO = userMapper.fromUser(user);
            userDTOList.add(userDTO);
        }
        res.putData("users", Optional.of(userDTOList));
        res.setSuccess(true);
        return res;
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
    @Transactional
    public ResponseDTO createUser(UserDTO userDTO) {
        ResponseDTO res = new ResponseDTO();

        Iterable<User> users = userRepo.findByUsernameOrEmail(userDTO.getUsername(),userDTO.getEmail());

        if(users.iterator().hasNext()) {
            res.setSuccess(false);
            res.setMessage("El nombre de usuario o el email ya existen.");
        }
        else{
            User userToDB = userMapper.toUser(userDTO);
            Role clientRole = roleRepo.findByName("client").get();
            UserStatus enabledUserStatus = userStatusRepo.findByName("enabled").get();
            userToDB.setRole(clientRole);
            userToDB.setUserStatus(enabledUserStatus);

            //User userSaved = userRepo.save(userToDB);

            Integer userCreatedValue = userRepo.insertUser(userToDB.getEmail(), userToDB.getPassword(), userToDB.getRole().getId(), userToDB.getUserStatus().getId(), userToDB.getUsername());
            if(userCreatedValue.equals(1)) {
                User userCreated = userRepo.findByEmail(userToDB.getEmail()).get();
                UserDTO userDTOCreated = userMapper.fromUser(userCreated);

                RoleDTO roleDTO = roleMapper.fromRole(userCreated.getRole());
                UserStatusDTO userStatusDTO = userStatusMapper.fromUserStatus(userCreated.getUserStatus());

                userDTOCreated.setRole(roleDTO);
                userDTOCreated.setUserStatus(userStatusDTO);

                System.out.println(roleDTO.toString());

                res.setSuccess(true);
                res.setMessage("Se ha creado el usuario.");
                res.putData("user", Optional.of(userDTOCreated));
            }else{
                res.setSuccess(false);
                res.setMessage("No se ha creado el usuario.");
            }

        }
        return res;
    }
}
