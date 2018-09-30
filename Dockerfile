ARG BUILD_FROM=hassioaddons/base:2.0.0
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Setup base
RUN \
    apk add --no-cache \
        nginx=1.14.0-r0

# Copy root filesystem
COPY rootfs /

# Build arugments
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION

# Labels
LABEL \
    io.hass.name="Hassio Home Display" \
    io.hass.description="UI for a wall mounted Home Assistant control panel" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="Mike Leonard <mike.r.leonard@gmail.com>" \
    org.label-schema.description="UI for a wall mounted Home Assistant control panel" \
    org.label-schema.build-date=${BUILD_DATE} \
    org.label-schema.name="Hassio Home Display" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.url="https://github.com/switchtrue/hassio-home-display" \
    org.label-schema.usage="https://github.com/switchtrue/hassio-home-display/tree/master/README.md" \
    org.label-schema.vcs-ref=${BUILD_REF} \
    org.label-schema.vcs-url="https://github.com/switchtrue/hassio-home-display" \
    org.label-schema.vendor="Community Hass.io Addons"