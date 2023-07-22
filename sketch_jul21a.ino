
#define soilPin A1
void setup() {
  pinMode(A1,INPUT);
  pinMode(8,INPUT);
  pinMode(9,INPUT);
  Serial.begin(9600);
}

void loop() {
  int soilValue = analogRead(soilPin);
  float moisturePercent = map(soilValue, 0, 1023, 0, 100);
  Serial.print(moisturePercent);
  Serial.print(",");
  Serial.print(analogRead(A0));
  Serial.print(",");
  Serial.print(digitalRead(8));
  Serial.print(",");
  Serial.print(digitalRead(9));
  Serial.println(",");
  delay(100);
}
