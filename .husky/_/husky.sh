sh
#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky:debug $1"
  }

  readonly hook_name="$(basename "$0")"
  readonly git_params="$*"
  readonly husky_skip_init=1
  export husky_skip_init
  debug "starting $hook_name..."

  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi

  export readonly husky_dir="$(cd "$(dirname "$0")/.." && pwd)"
  debug "husky directory is $husky_dir"
  export readonly husky_node_modules_dir="$husky_dir/node_modules"
  export readonly husky_bin_dir="$husky_node_modules_dir/.bin"
  export PATH="$husky_bin_dir:$PATH"
  debug "PATH is set to $PATH"

  if [ "$HUSKY_DEBUG" = "1" ]; then
    echo "husky: $hook_name hook started..."
  fi
fi