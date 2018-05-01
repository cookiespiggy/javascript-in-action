JavaScript变量类型(按照存储方式)
    值类型
        var a = 100; // number类型
        var b = a;
        a = 200;
        console.log(b); // 100
        我们会发现,我们对变量a的操作完全对b无影响,就说明a与b是单独存储的,这就是值类型.
        类比Java,基本类型和String也都是如此.
    引用类型
        var a = {age:20};
        var b = a;
        a.age = 21;
        console.log(b.age); // 21
        为了节省内存空间,对象只存储一份,a和b只是句柄,指向同一块内存空间.
        在js中,引用类型包括`对象`,`数组`,`函数`.
        在js中,引用类型可以无限扩展属性.a.name,a.xxx等 
        在js中,对象可以有age属性等,数组和函数也是有xx属性的.
    typeof运算符详解
        typeof undefined // undefined
        typeof null // object
        typeof 'abc' // string
        typeof 123 // number
        typeof true // boolean
        typeof {} // object
        typeof [] // object
        typeof console.log // function
        说明:typeof仅能区别值类型的数据类型,`undefined` `string` `number` `boolean`
值类型的计算-强制类型转换
    使用场景
        字符串拼接
            var a = 100 + 10 // 110
            var b = 100 + '10' // '10010'
            此时,就是在字符串拼接的时候,发生了类型转换
        == 运算符
            100 == '100' // true        把100转成了'100'
            0 == '' // true     把0转成了false,把''转成了false
            null == underfined // true      把null转成了false,把underfined转成了false
            所以 == 运算符一定要慎用,因为它会试图让两边相等,会发生类型转换
            补充一点:只有在下面这种情况下使用==比较
            if(obj.a == null) {
                // 这里相当于obj.a === null || obj.a === underfined 的简写形式
            }
        if语句
            var a = true 
            if (a) {
                //...
            }
            
            var b = 100
            if (b) { // if会把()里的变量,转换为boolean类型,也就是把b转成了true
                // ...
            }

            var c = ''
            if (c) { // 把c转成了false
                //...
            }
        逻辑运算
            console.log(10 && 0) // 0       实际上是把10转成了true  true && 0  true会走&&后面的语句,就是0了
            console.log('' || 'abc') // 'abc'       ''转成了false
            console.log(!window.abc) // true        window.ab是underfined !后就是true了
    判断一个变量会被当做true还是false
        var a = 100;
        console.log(!!a); // true
不考虑js的运行环境,单纯作为一门语言来说,有哪些内置函数(数据封装类对象)
    内置的函数
        Object
        Array
        Boolean
        Number
        String
        Function
        Date
        RegExp
        Error
        这些有什么作用,要追溯到原型链来说了
        所以,内置函数的作用就是作为构造函数来使用
    内置的对象
        Math
        JSON
            JSON.stringify({a : 10}) // 把对象变成字符串
            JSON.parse("") // 把字符串变成对象
原型和原型链
    题目
        如何准确的判断一个变量是数组类型
            var arr = []
            arr instanceof Array
        写一个原型链继承的例子
            // 动物
            function Animal() {
                this.eat = function() {
                    console.log("animal eat")
                }
            }
            // 狗
            function Dog() {
                this.bark = function() {
                    console.log('dog dark')
                }
            }
            Dog.prototype = new Animal(); // 把这个Dog.prototype的值改了Animal的对象,就有了个eat的属性了
            // 哈士奇
            var hashiqi = new Dog()
            // 我们的 hashiqi 有几种属性 ?    有bark,是new出来的(new的过程) 有eat,是hashiqi.__proto__中的

            /**
             * 
             * 
             * 标准写法 ======================
             * 
             * 
             * 
             */
            /*
            
                function Elem(id) {
                    this.elem = document.getElementById(id)
                }

                Elem.prototype.html = function(val) {
                    var elem = this.elem
                    if(val) {
                        elem.innerHTML = val
                        return this // 为了链式操作
                    } else {
                        return elem.innerHTML
                    }
                }

                Elem.prototype.on = function(type,fn) {
                    var elem = this.elem
                    elem.addEventListener(type,fn)
                    return this
                }

                var div1 = new Elem('div-id')
                div1.html('<p>hello imooc</p>').on('click',function(){
                    alert('hello')
                })
            
            
            
            
            
            */
        描述new一个构造函数并对象的过程
            首先new构造函数的时候,可以把参数传进去,也可以不传,然后构造函数里面的this会先变成一个空对象,这个空对象就表示这个构造函数了,函数也是引用类型嘛,
            然后如果传入参数,就this.xxx = xxxVal,最后把this返回,赋值给句柄.这个时候,这个句柄就具有了
            这些属性了.

            /*
                总结
                    1. 创建一个新对象
                    2. this指向这个对象
                    3. 执行代码,即对this赋值
                    4. 返回this
            */
        框架源码中如何使用原型链
            搜索XXX源码分析
    知识点
        构造函数
            function Foo(name, age) {
                this.name = name
                this.age = age
                this.class = 'class-1'
                // return this // 默认有这一行
            }
            var f = new Foo('zhangsan', 20)
            //var f1 = new Foo('lisi', 20) // 创建多个对象
        构造函数扩展
            // var a = {}  其实是 var a = new Object() 的语法糖
            // var b = []  其实是 var b = new Array() 的语法糖
            // function Foo() {}  其实是 var Foo = new Function() 的语法糖
            // 使用instanceof判断一个函数是否是一个变量的构造函数
            所有的引用类型都有构造函数,对象有,数组有,函数也有
        原型规则和示例(原型链的基础)
            原型规则是理解原型链的基础
            /*  
                1. 所有的引用类型(数组,对象,函数)都具有对象特征,即可自由扩展属性(`null`除外)
                    var obj = {} ; obj.a = 100
                    var arr = [] ; arr.a = 100
                    function fn() {...} fn.a = 100
                2. 所有的引用类型(数组,对象,函数)都有一个__proto__属性(隐式原型),属性值是一个普通的对象(也能拓展属性)
                    obj.__proto__   符合第1条
                    arr.__proto__
                    fn.__proto__
                3. 所有的函数,都有一个prototype属性(显式原型),属性值也是一个普通对象
                    fn.prototype    符合第1条
                4. 所有的引用类型(数组,对象,函数),__proto__属性值指向它的构造函数的prototype属性值
                    obj.__proto__ === Object.prototype
                5. 当试图得到一个对象的某个属性时,如果这个对象本身没有这个属性,那么会去它的__proto__中寻找(即去它的构造函数的prototype中)
                    // 构造函数
                    function Foo(name,age) {
                        this.name = name
                    }
                    Foo.prototype.alertName = function() {
                        console.log(this); // this表示Foo这个引用类型,这个引用类型有name的属性,没有的话就可以扩展,因为上面定义的时候,已经扩展了,所以有name属性
                        alert(this.name)
                    }
                    var f = new Foo("小明") // 通过Foo这个构造函数,创建了一个对象
                    f.printName = function() { // 给f这个对象扩展了printName这个属性
                        console.log(this.name);
                    }
                    f.printName() // 调用名为printName的函数
                    f.alertName() // 调用名为alertName的函数,一看f这个对象本身没有这个属性,那么会去它的__proto__中寻找(即去它的构造函数的prototype中)
                        我们刚给构造函数的prototype扩展了
                        通过对象的属性这种形式去执行函数的时候,在执行的时候,this永远指向函数自身,可以打印this看看
                            f
                            Foo{name:"",printName:function(){}}
                            这俩是一个东西
                    var item
                    for(item in f) {
                        // 高级浏览器已经在for in 循环中,屏蔽了来着原型的属性
                        // 但还是建议大家加上这个判断,保证程序的健壮性.
                        if(f.hasOwnProperty(item)) {
                            console.log(item)
                        }
                    }
            */
        原型链
            // 构造函数
            function Foo(name, age) {
                this.name = name
            }
            Foo.prototype.alertName = function() { alert(this.name) }
            // 创建实例
            var f = new Foo('zhangsan')
            f.printName = function() { console.log(this.name) }
            // 测试
            f.printName()
            f.alertName()
            f.toString() // 要去f.__proto__.__proto__中查找
        原型链的具体表示形式之一instanceof
            instanceof用于判断引用类型属于哪个构造函数
            /*  
                f instanceof Foo 的判断逻辑
                    f的__proto__一层一层往上,能否对应到Foo.prototype
                再试着判断f instanceof Object
                    一层一层往上找,可以找得到
            */
作用域和闭包
    题目
        说一下对变量提升的理解

        说明this几种不同的使用场景

        创建10个<a>标签,点击的时候弹出来对应的序号(这其实不是DOM操作的问题,是闭包或者作用域的问题)

        如何理解作用域

        实际开发中闭包的应用(闭包是作用域这个知识点的实际应用)
    
    知识点
        执行上下文
            /*  代码演示

                console.log(a) // underfined
                var a = 100

                fn('zhangsan') // 'zhangsan' 20
                function fn(name) {
                    age = 20
                    console.log(name,age)
                    var age
                }

            */
            讲解
                范围: 一段<script>内或者一个函数内,都会生成一个执行上下文
                针对script>内来说,会生成一个全局的执行上下文
                    在执行之前先把变量定义和函数声明拿出来,拿到最开始
                针对函数来说,会生成一个函数执行上下文
                    在函数执行之前,会把变量定义|函数声明|this|arguments拿出来
                    注意函数声明和函数表达式的区别
                        声明: function fn(){}
                        表达式: var fn = function() {}
                
        this
            要在执行时才能确认值,定义时无法确认(谁调用了函数,this就指向谁)
            使用场景
                作为构造函数执行(构造函数的this和其他的不一样,这就牵扯出了new的过程了,首先是一个空对象)
                    function Foo(name) {
                        // this = {}
                        this.name = name
                        // return this
                    }
                    var f = new Foo('zhangsan')
                作为对象属性执行
                    var obj = {
                        name : 'A',
                        printName : function() {
                            console.log(this.name)
                        }
                    }
                    obj.printName() // 此时this === obj
                作为普通函数执行(this是window)
                    function fn() {
                        console.log(this) // 此时 this === window
                    }
                    fn() // 此时 this === window

                call|apply|bind(框架里用来改变this的值,有点像Java中的反射)
                    function fn1(name,age) {
                        alert(name)
                        console.log(this) 
                    }
                    fn1.call({x:100},'zhangsan',20) // 此时this === {x:100}
                    fn1.apply({x:100},['zhangsan',20]) // 此时this === {x:100}
                    
                    var fn2 =function (name,age) {
                        alert(name)
                        console.log(this) // this === {y : 200}
                    }.bind({y : 200})
                    fn2('zhangsan',20)
        作用域
            js没有块级作用域
            只有函数作用域和全局作用域
            /*
                function fn2() {
                    var f = 100
                    console.log(f)
                }
                undefined
                fn2()
                VM407:3 100
                undefined
                fn2.f = 200
                200
                fn2()
                VM407:3 100
            */
        作用域链
            本作用域中没有定义,该变量就是自由变量,去定义本函数的父级作用域中去找
            一个自由变量,去往父级作用域中去找,就形成了一个链式的结构
        闭包
            



