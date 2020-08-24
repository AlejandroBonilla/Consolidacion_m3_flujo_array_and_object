var todo_list =[];
var todo_hecho =[];

function inicio(){
  var button = document.getElementById("button-add-new");
  var input_entrada = document.getElementById("new-todo");
  var todo = document.getElementById("todo");
  button.onclick = ()=>{
    var new_todo = input_entrada.value;
    agregar_nuevo(todo_list, new_todo);
    clean_input(input_entrada);
    imprimir_lista(todo_list, todo);
    console.log(todo_list);
    actualizarTareas();
  }
}

function agregar_nuevo(todo_arr, item){
  todo_arr.push(item);
}

function clean_input(input){
  input.value ="";
}

function imprimir_lista(todo_arr, todo_html){
  todo_html.innerHTML = "";

  todo_arr.forEach( (element,index) => {
     todo_html.innerHTML += `
     <div id="${index}" class='grid'>
        <div><input id="${index}" type='checkbox' onclick="tarea_terminada(this)"></div>
        <div><input type='text' value="${element}"></div>
        <div><button id="${index}" onclick="borrar_item(this)">borrar</button></div>
      </div>
     `  ;
    });
}

function borrar_item(ele){
  var index = ele.id;
  var todo = document.getElementById("todo");
  todo_list.splice(index,1);
  imprimir_lista(todo_list, todo);
  actualizarTareas();
}

function tarea_terminada(ele){
  var index = ele.id;
  var todo_html = document.getElementById("todo_terminado")
  todo_hecho.push(todo_list[index]);
  borrar_item(ele);
  imprimir_todo_terminado(todo_hecho,todo_html);
  actualizarTareas();
}

function imprimir_todo_terminado(todo_arr, html){
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  html.innerHTML +=`<li>${todo_arr[todo_arr.length-1]} - Finalizado: ${time}</li>`
}

function actualizarTareas(){
  var pendientes = document.getElementById("tareas_pendientes");
  var realizadas = document.getElementById("tareas_realizadas");

  pendientes.textContent = `(${todo_list.length})`;
  realizadas.textContent = `(${todo_hecho.length})`;
}