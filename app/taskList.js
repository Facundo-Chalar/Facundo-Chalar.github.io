let jsonTaskList= [
    {
        title:"Task Title"
        ,img:"https://picsum.photos/1600/900"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back." /// <= Pretty long
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2020") /// Has enough time to finish
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018") /// <== Past due.
    }
    ,{
        title:"1Task Title"
        ,img:"https://picsum.photos/1600/900?v1" /// <=== big image
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2020")
        ,isCompleted:true
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2020")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2020")
    },{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2020")
    },{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2020")
    },{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2020")
    },{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2020")
    },{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2020")
    },{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2020")
    },{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2020")
    },{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2018")
    }
    ,{
        title:"Task Title"
        ,description:"This is a description of the task. Its important to make sure the task manager is able to deal with really long descriptions. Even if its a list of W's back to back."
        ,createdOn:new Date()
        ,createdBy:"Jane Smith"
        ,dueDate:new Date("01/01/2020")
    }
];