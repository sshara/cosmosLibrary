package com.zanahoria.firstProject.web.controller;

import com.zanahoria.firstProject.service.UserService;
import com.zanahoria.firstProject.web.dto.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        List<UserDTO> response = userService.getUsers();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    /*

    @PostMapping()
    public ResponseEntity<?> addUsuario(@Valid @RequestBody UsuarioDTO usuarioDTO, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Formulario con datos incorrectos.");
        }
        else{
            try{
                UsuarioDTO resp = usuarioService.addUsuario(usuarioDTO);
                return ResponseEntity.status(HttpStatus.CREATED).body(resp);
            }
            catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }
    }


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
