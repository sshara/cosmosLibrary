package com.zanahoria.firstProject.web.controller;

import com.zanahoria.firstProject.service.UserService;
import com.zanahoria.firstProject.web.dto.ResponseDTO;
import com.zanahoria.firstProject.web.dto.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> getUsers(){
        ResponseDTO res = userService.getUsers();
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }




    @PostMapping()
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("datos incorrectos");
        }
        else{
            ResponseDTO res;
            try{
                res = userService.createUser(userDTO);
                return ResponseEntity.status(HttpStatus.OK).body(res);
            }
            catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }
    }

/*
    @GetMapping(params = {"name", "email"}) // /nombre=pepinote?email=tu@pu.tita
    public ResponseEntity<?> getUsuariosWithNameLike(@RequestParam String nombre, @RequestParam String email){
        List<UsuarioDTO> resp = usuarioService.getUsuariosWithNameLike(nombre);
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUsuario(@PathVariable("id") String id){
        try{
            UsuarioDTO resp = usuarioService.getUsuario(id);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }
*/

}
