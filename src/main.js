(function() {
    //создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    //создаем и возвращаем форму для создания дела
    function createTodoItemForm() {
        let form=document.createElement('form');
        let input=document.createElement('input');
        let buttonWrapper=document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder='Введите новое Дело..';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent="Добавить дело";

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return{
            form,
            input,
            button,
        };
    }

    //создаем и возвращаем список элементов
    function createTodoList() {
        let list=document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name){
        let item = document.createElement('li');
        //кнопки помещаем в элемент, который покажет их в одной группе
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        //устанавливаем стили для размещения кнопок, а так же для размещения кнопок
        //в его правой части с помощью flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center');
        item.textContent=name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent='Удалить';

        //вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        //приложению нужен доступ к самомму элементу и кнопкам, чтобы обрабатывать события нажатия
        return{
            item,
            doneButton,
            deleteButton,
        };
    }

    document.addEventListener('DOMContentLoaded', function(){
        let container=document.getElementById('todo-app');

        let todoAppTitle=createAppTitle('Список дел :');
        let todoItemForm=createTodoItemForm();
        let todoList=createTodoList();
        //let todoItems=[createTodoItem('Сходить за хлебом'), createTodoItem('Купить молоко')];

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        //браузер создает событие submit на форме по нажатию enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function(e){
            e.preventDefault(); //отключаем стандартное событие на форме
            //игнорируем создание нового элемента если пользователь ничего не ввел на форме
            if(!todoItemForm.input.value){
                return;
            }

            //todoList.append(createTodoItem(todoItemForm.input.value).item); //создали новое дело

            let todoItem = createTodoItem(todoItemForm.input.value);

            //добавляем обработчики на кнопки
            todoItem.doneButton.addEventListener('click', function(){
                todoItem.item.classList.toggle('list-group-item-success');
            })

            todoItem.deleteButton.addEventListener('click', function(){
                if(confirm('Вы уверены?')){
                    todoItem.item.remove();
                }
            })

            todoList.append(todoItem.item);

            //обнуляем заполненый инпут
            todoItemForm.input.value='';

        })

    })


    })();
