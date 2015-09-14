require 'sass/plugin/rack'

use Sass::Plugin::Rack

use Rack::Static,
  :urls => ["/images", "/js", "/stylesheets"],
  :root => "public"

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('public/index.html', File::RDONLY)
  ]
}