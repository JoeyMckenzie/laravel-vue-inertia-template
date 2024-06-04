default: dev

dev:
    php artisan serve & pnpm run dev

install:
    rm -rf node_modules/ pnpm-lock.yaml composer.lock vendor/; \
    pnpm install; \
    composer install;

ssr:
    find resources/ *.ts *.js | entr -s 'rm -rf bootstrap/ssr/ && pnpm run build && php artisan inertia:start-ssr'

lint-php:
    find app/ resources/ routes/ database/ tests/ phpstan.neon | entr -s 'composer run lint'

lint-js:
    find resources/js/ *.ts *.js | entr -s 'pnpm run check'

test:
    find app/ resources/ routes/ database/ tests/ phpstan.neon | entr -s 'composer run test'

remigrate:
    php artisan migrate:fresh --seed

ci:
    composer run check && pnpm run lint

prepare:
    git config core.hookspath .githooks
