int clock = 2;
int strobe = 3;
int data = 4;


void setup(){
  pinMode(clock, OUTPUT);
  pinMode(strobe, OUTPUT);
  pinMode(data, INPUT);
  Serial.begin(57600);
}

void loop(){
  
  //Strobe();  
  
  int theButton = Button();
  
  if(Serial.available() > 0){
       
      //Serial.println(digitalRead(data));
      //Serial.println(Button());
       
       switch(theButton){
          case 255:
              break;
          case 191:
             Serial.println("LEFT");
             break;
          case 239:
              Serial.println("UP");
              break;
          case 127:
              Serial.println("RIGHT");
              break;
          case 95:
              Serial.println("DOWN");
               break;
          case 175:
              Serial.println("LEFTUP");
              break;
          case 159:
               Serial.println("LEFTDOWN");
               break;
          case 111:
              Serial.println("RIGHTUP");
              break;
          case 251:
              Serial.println("SELECT");
              break;
          case 247:
              Serial.println("START");
              break;
          case 254:
              Serial.println("B BUTTON");
              break;
          case 253:
              Serial.println("Y BUTTON");
               break;
          default :
             Serial.println(Button());
             break;
       }
       
  }
  
}

byte Button(){
  byte ret = 0;
  byte i;
  
  Strobe();
  
  for (i = 0; i < 8; i++) {
    ret |= shiftIn() << i;
  }
  return ret; 
}

void Strobe(){
  digitalWrite(strobe,HIGH);
  delay(2);
  digitalWrite(strobe,LOW); 
}

byte shiftIn(){
  byte ret = digitalRead(data);
  delay(2);
  digitalWrite(clock,HIGH);
  delay(2);
  digitalWrite(clock,LOW);
  return ret; 
}
