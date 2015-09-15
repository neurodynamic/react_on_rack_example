require 'sass/plugin/rack'
require "autoprefixer-rails"

class ToPrefixed
  def initialize(app)
    @app = app
  end
 
  def call(env)
    status, headers, body  = @app.call(env)
 
    css = File.read('public/stylesheets/app.css')

    prefixed_css = AutoprefixerRails.process(css, from: 'app.css').css

    File.open('public/stylesheets/app.css', "wb") do |file|
      file.write(prefixed_css)
    end

    [status, headers, body]
  end
end



use Sass::Plugin::Rack

use ToPrefixed

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