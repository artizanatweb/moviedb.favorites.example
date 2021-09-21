<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\FavoriteRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(\App\Repositories\Interfaces\FavoriteRepository::class, FavoriteRepository::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
