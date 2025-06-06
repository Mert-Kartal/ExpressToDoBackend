import winston from "winston";
import path from "path";
import fs from "fs";

// Logs klasörünün varlığını kontrol et ve yoksa oluştur
const logsDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Özel log formatı
const customFormat = winston.format.printf(
  ({ timestamp, level, message, ...meta }) => {
    let logMessage = `\n[${timestamp}] ${level.toUpperCase()}\n`;
    logMessage += `Message: ${message}\n`;

    // Meta verileri ekle
    if (Object.keys(meta).length > 0) {
      logMessage += "Details:\n";
      Object.entries(meta).forEach(([key, value]) => {
        if (value !== undefined) {
          logMessage += `${key}: ${JSON.stringify(value, null, 2)}\n`;
        }
      });
    }

    logMessage += "----------------------------------------\n";
    return logMessage;
  }
);

// Logger konfigürasyonu
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    customFormat
  ),
  transports: [
    // Console'a log yazma
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), customFormat),
    }),
    // Tek dosyaya log yazma
    new winston.transports.File({
      filename: path.join(logsDir, "app.log"),
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
  exitOnError: false,
});

// Test log mesajı
logger.info("Logger initialized successfully");

export default logger;
