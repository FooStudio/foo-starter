/**
 * Created by mendieta on 7/21/16.
 */


export function loaderAppear ( utils ) {
    return new TimelineMax()
        .to( utils.target, 0.5, {
            autoAlpha: 1,
            ease     : Sine.easeOut,
            overwrite: 'all'
        } );
}

export function loaderDisapper ( utils ) {
    return new TimelineMax()
        .to( utils.target, 0.5, {
            autoAlpha: 0,
            ease     : Sine.easeIn,
            overwrite: 'all'
        } );
}
