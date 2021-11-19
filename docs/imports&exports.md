## Абсолютные импорты

http://jamesknelson.com/re-exporting-es6-modules/

Создаем на одном уровне с src файл jsconfig.json с настройками:

```
{
    "compileOptions": {
        "baseUrl": "src"
    },
    "include": ["src"]
}
```

теперь при указании путей нужно писать только то, что после src
