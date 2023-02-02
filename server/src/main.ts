import { createNestApp } from './app.config';
import * as hbs from 'express-handlebars';
import { join } from 'path';

async function bootstrap() {
  const { app } = await createNestApp();
  app.enableCors();
  await app.init();
  app.setBaseViewsDir(join(__dirname, '..', 'views/'));
  app.engine(
    'hbs',
    hbs.create({
      extname: 'hbs',
      partialsDir: join(__dirname, '..', 'views/partials/'),
      layoutsDir: join(__dirname, '..', 'views/'),
      helpers: {
        ifIn: function (elem, list, options) {
          if (!list || list.includes(elem)) {
            return options.fn(this);
          }
          return options.inverse(this);
        },
      },
    }).engine
  );
  app.setViewEngine('hbs');

  await app.listen(process.env.APP_PORT || 4000);
}
bootstrap();
