@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ __('Welcome') }}</div>

                    <div class="card-body">
                        <h1>Let's get started</h1>
                        <p>Laravel has an incredibly rich ecosystem. We suggest starting with the following:</p>
                        <ul>
                            <li><a href="https://laravel.com/docs">Read the Documentation</a></li>
                            <li><a href="https://laracasts.com">Watch video tutorials at Laracasts</a></li>
                            <li><a href="https://forge.laravel.com">Deploy now</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
