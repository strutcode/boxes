enum LogLevel {
  NONE,
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class Log {
  public static level: LogLevel = LogLevel.DEBUG

  public static debug(msg: string, ...vars: any[]): void {
    if (this.level < LogLevel.DEBUG) return

    this.message(LogLevel.DEBUG, msg, vars)
  }

  public static info(msg: string, ...vars: any[]): void {
    if (this.level < LogLevel.INFO) return

    this.message(LogLevel.INFO, msg, vars)
  }

  public static warn(msg: string, ...vars: any[]): void {
    if (this.level < LogLevel.WARN) return

    this.message(LogLevel.WARN, msg, vars)
  }

  public static error(msg: string, ...vars: any[]): void {
    if (this.level < LogLevel.ERROR) return

    this.message(LogLevel.ERROR, msg, vars)
  }

  private static message(type: LogLevel, content: string, vars: any[]): void {
    let level = ''
    let style = 'display: inline-block; width: 5em; text-align: right; line-height: 1.5em; padding-right: 1em'

    if (type === LogLevel.DEBUG) {
      level = 'Debug'
      style += ';background: rgba(128, 128, 128, 0.5)'
    }
    if (type === LogLevel.INFO) {
      level = 'Info'
      style += ';background: rgba(0, 0, 100, 0.5)'
    }
    if (type === LogLevel.WARN) {
      level = 'Warn'
      style += ';background: rgba(100, 100, 0, 0.5)'
    }
    if (type === LogLevel.ERROR) {
      level = 'Error'
      style += ';background: rgba(255, 0, 0, 0.5)'
    }

    // eslint-disable-next-line no-console
    console.log(`%c${level}%c ${content}`, style, 'background:initial; line-height: 1.5em', ...vars)
  }
}
