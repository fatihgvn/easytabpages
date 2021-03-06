function findGetParameter(t){for(var e=null,n=[],r=location.search.substr(1).split("&"),o=0;o<r.length;o++)(n=r[o].split("="))[0]===t&&(e=decodeURIComponent(n[1]));return e}

var tabPage = function(selector){
    this.datas = {
        tp: undefined,
        menu: [],
        tabs: [],
        defaultTab: 0,
        getSource: "tab"
    };
    var initComplate = false;
    var _this = this;
    this.datas.tp = document.querySelector(selector);
    this.datas.tp.querySelectorAll("ul li").forEach(function(el){
        _this.datas.menu.push(el);
    });

    var menuclickfunction = function(_t,_this){
        var tpid = _t.getAttribute("tp-id");
        for(var i = 0; i<_t.parentNode.children.length;i++)
            _t.parentNode.children[i].classList.remove("active");
        for(var i = 0; i<_t.parentNode.parentNode.children.length;i++)
            _t.parentNode.parentNode.children[i].classList.remove("active");

        _t.classList.add("active");
        
        _this.datas.tabs[tpid].classList.add("active");
    }

    for(var i = 0; i<this.datas.tp.children.length;i++)
        if (this.datas.tp.children[i].tagName == "DIV")
            this.datas.tabs.push(this.datas.tp.children[i]);

    this.init = function(){
        
        this.datas.menu.forEach(function(element,index){
            element.setAttribute("tp-id",index);
            
            element.addEventListener("click",function(){menuclickfunction(this,_this)});
                
        });
        var ci = parseInt(findGetParameter(this.datas.getSource));        
        if(ci != null && ci != undefined && this.datas.menu[ci] != undefined && ci != NaN)
            this.datas.menu[ci].click();
        else
            this.datas.menu[this.datas.defaultTab].click();
            initComplate = true;
        return this;
    }

    this.goIndex = function (index){
        this.datas.menu[index].click();
        return this;
    }

    this.defaultTab = function(v){
        this.datas.defaultTab=v;
        return this;
    }

    this.getSource = function(v){
        this.datas.getSource=v;
        return this;
    }

    this.addTab = function(mhtml, thtml){
        thtml = (typeof thtml !== 'undefined') ?  thtml : "create new tab #"+this.datas.menu.length;
        var nmenu = document.createElement("li"), ntab = document.createElement("div"); // create dom elements
        var tpid = this.datas.menu.length;
        nmenu.innerHTML = mhtml; ntab.innerHTML = thtml; // insert html codes
        nmenu.setAttribute("tp-id",tpid); // add tp-id value
        if(initComplate) nmenu.addEventListener("click",function(){menuclickfunction(this,_this)}); // add new click event
        this.datas.tp.querySelector("ul").appendChild(nmenu); this.datas.tp.appendChild(ntab); // append dom childs
        this.datas.menu.push(nmenu); this.datas.tabs.push(ntab); // add object datas
        return tpid; // return tab id
    }

    this.removeTab = function(tpid){
        this.datas.menu[tpid].remove();
        this.datas.tabs[tpid].remove();
        return false;
    }

    this.setTabName = function(name,tpid){
        this.datas.menu[tpid].innerHTML = name;
        return this;
    }

    this.setTabContent = function(html,tpid){
        this.datas.tabs[tpid].innerHTML = html;
        return this;
    }

    return this;
}