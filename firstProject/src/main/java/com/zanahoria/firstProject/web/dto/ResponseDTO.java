package com.zanahoria.firstProject.web.dto;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.jackson.Jacksonized;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Data
@NoArgsConstructor
public class ResponseDTO implements Serializable {
    private String message;
    private Map<String, Optional<?>> data = new HashMap<String, Optional<?>>();
    private Boolean success;

    public Gson ToGson(){
        return null;
    }

    public void putData(String key, Optional<?> value){
       this.data.put(key, value);
    }

    public void printData(){
        this.data.forEach((key, value) -> System.out.println(key + ":" + value));
    }
}
