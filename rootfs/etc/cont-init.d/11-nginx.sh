#!/usr/bin/with-contenv bash
# ==============================================================================
# Community Hass.io Add-ons: Home Assistant Control Panel
# Configures NGINX for use with Home Assistant Control Panel
# ==============================================================================
# shellcheck disable=SC1091
source /usr/lib/hassio-addons/base.sh

declare certfile
declare keyfile

if hass.config.true 'ssl'; then
    rm /etc/nginx/nginx.conf
    mv /etc/nginx/nginx-ssl.conf /etc/nginx/nginx.conf

    certfile=$(hass.config.get 'certfile')
    keyfile=$(hass.config.get 'keyfile')

    sed -i "s/%%certfile%%/${certfile}/g" /etc/nginx/nginx.conf
    sed -i "s/%%keyfile%%/${keyfile}/g" /etc/nginx/nginx.conf
fi

if ! hass.config.true 'ipv6'; then
    sed -i '/listen \[::\].*/ d' /etc/nginx/nginx.conf
fi
