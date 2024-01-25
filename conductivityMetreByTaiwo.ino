#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <OneWire.h>
#include <DallasTemperature.h>

LiquidCrystal_I2C lcd(0x27, 16, 2); // Address 0x27 for a 16x2 LCD

OneWire oneWire(2); // Pin D2 for the temperature sensor
DallasTemperature sensors(&oneWire);

const int conductivityPin = A0;
// Calibration parameters
const float temperatureConversionFactor = 1.0; // Adjust based on temperature calibration
const float conductivityConversionFactor = 1.0; // Adjust based on conductivity calibration

void setup() {
  lcd.begin(16, 2);
  sensors.begin();
}

void loop() {
  // Read temperature
  sensors.requestTemperatures();
  float temperature = sensors.getTempCByIndex(0) * temperatureConversionFactor;

  // Read conductivity
  int sensorValue = analogRead(conductivityPin);
  float voltage = (float)sensorValue * (5.0 / 1023.0);
  float conductivity = voltage * 1000 * conductivityConversionFactor; // Adjust based on conductivity calibration
  // Display on LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(temperature);
  lcd.print(" C");
  lcd.setCursor(0, 1);

  lcd.print("Cond: ");
  lcd.print(conductivity);
  lcd.print(" uS/cm");
  delay(1000); // Adjust delay as needed
}
