function LinkPointer(obj, roomName) {
    this.obj = obj;
    this.timeId = '';
    this.onLoad = false;
    this.roomName = roomName;
    this.checkLinks = function () {
        return this.obj
    };
    this.getRoomName = function(){
        return this.roomName;
    }
    this.changeRoom = function (rect, pointloc, nextRoom, className) {
        var self = this;
        
        
        if ((pointloc.x - 60 < rect.x && pointloc.x + 20 > rect.x) && (pointloc.y - 60 < rect.y && pointloc.y + 20 > rect.y)) {
            
            
            if (!self.onLoad) {
                className.childNodes[0].src = 'img/loader.gif'
                self.onLoad = true
                var count = 0;
                
                self.timeId = setInterval(function () {
                    count++;
                    console.log(count)

                    if (count > 2) {
                        self.onLoad = false;
                        clearInterval(self.timeId);
                        className.childNodes[0].src = 'img/link.png'
                        panoramicApp.switchScene(panoramicApp.findSceneById(nextRoom))

                    }
                }, 700)
            }

        } else {

            self.onLoad = false;
            clearInterval(self.timeId);
            className.childNodes[0].src = 'img/link.png'
        }

    };
}