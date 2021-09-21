<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFavoritesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained();
            $table->bigInteger('movie_id');
            $table->string('original_title', 250)->nullable(true);
            $table->text('overview')->nullable(true);
            $table->string('original_language', 2)->nullable(true);
            $table->date('release_date')->nullable(true);
            $table->timestamps();

            $table->unique(["client_id", "movie_id"], 'client_movie_unique');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('favorites');
    }
}
